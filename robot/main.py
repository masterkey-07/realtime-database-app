import time
import psutil
import platform
import concurrent.futures
from influxdb_client_3 import InfluxDBClient3, Point, WritePrecision

# InfluxDB Config
INFLUXDB_URL = "http://localhost:8181"
INFLUXDB_TOKEN = "apiv3_sZzGvCIzc5IiG-UEmH_6nmLZqg2q0AiedcwJ_9b71kxoqhY_PDhzoRj9LyRGpPL7xnY6nwGUNF1vSjkluzgzlw"
DB_NAME = "unifesp"

# Initialize InfluxDB client
client = InfluxDBClient3(host=INFLUXDB_URL, token=INFLUXDB_TOKEN, database=DB_NAME)

def collect_cpu_info():
    return {"cpu_percent": psutil.cpu_percent(interval=1)}

def collect_network_info():
    net_io = psutil.net_io_counters()
    return {
        "bytes_sent": net_io.bytes_sent,
        "bytes_recv": net_io.bytes_recv
    }

def collect_memory_info():
    mem = psutil.virtual_memory()
    return {
        "mem_total": mem.total,
        "mem_used": mem.used,
        "mem_percent": mem.percent
    }

def collect_disk_info():
    disk = psutil.disk_usage('/')
    return {
        "disk_total": disk.total,
        "disk_used": disk.used,
        "disk_percent": disk.percent
    }

def collect_process_info():
    return {"process_count": len(psutil.pids())}

def collect_temperature_info():
    temps = psutil.sensors_temperatures()
    temp_readings = {}
    for name, entries in temps.items():
        for entry in entries:
            label = f"{name}_{entry.label or 'core'}"
            temp_readings[label] = entry.current
    return temp_readings

def collect_system_info():
    return {
        "os": platform.system(),
        "hostname": platform.node()
    }

def collect_battery_info():
    battery = psutil.sensors_battery()
    if battery:
        return {
            "battery_percent": battery.percent,
            "battery_secs_left": battery.secsleft,
            "battery_power_plugged": battery.power_plugged
        }
    else:
        return {
            "battery_percent": None,
            "battery_secs_left": None,
            "battery_power_plugged": None
        }

def collect_process_details():
    details = []
    for proc in psutil.process_iter(['pid', 'name', 'cpu_percent', 'memory_percent']):
        try:
            info = proc.info
            details.append(info)
        except (psutil.NoSuchProcess, psutil.AccessDenied):
            continue
    return details

def collect_swap_memory():
    swap = psutil.swap_memory()
    return {
        "swap_total": swap.total,
        "swap_used": swap.used,
        "swap_free": swap.free,
        "swap_percent": swap.percent
    }

def collect_network_connections():
    conns = psutil.net_connections()
    return {"connection_count": len(conns)}

def publish_data(measurement, data):
    point = Point(measurement)
    
    for key, value in data.items():
        point.field(key, value)
    
    point.time(time.time_ns(), WritePrecision.NS)
    
    client.write(point)

def main_loop():
    while True:
        with concurrent.futures.ThreadPoolExecutor() as executor:
            futures = {
                "cpu": executor.submit(collect_cpu_info),
                "memory": executor.submit(collect_memory_info),
                "disk": executor.submit(collect_disk_info),
                "process": executor.submit(collect_process_info),
                "swap": executor.submit(collect_swap_memory),
                "temp": executor.submit(collect_temperature_info),
                "network": executor.submit(collect_network_info),
                "network_connections": executor.submit(collect_network_connections),
                "battery": executor.submit(collect_battery_info),
            }

            for measurement, future in futures.items():
                try:
                    result = future.result()

                    if isinstance(result, list):
                        for proc in result:
                            publish_data(measurement, proc)
                    else:
                        publish_data(measurement, result)
                    
                    print({measurement: result})
                except Exception as e:
                    print(f"[ERROR] {measurement}: {e}")

        time.sleep(0.1)  # Sleep between cycles

if __name__ == "__main__":
    try:
        print("Starting system monitor...")
        main_loop()
    except KeyboardInterrupt:
        print("Exiting monitor...")
        client.close()
