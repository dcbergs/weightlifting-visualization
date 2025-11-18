## LLM slop to convert my csv to json :)
import csv
import json
from datetime import datetime

def is_date(string):
    """Check if a string is a date in mm/dd/yy format."""
    try:
        datetime.strptime(string, '%m/%d/%y')
        return True
    except ValueError:
        return False

def convert_csv_to_js(csv_file, js_file):
    with open(csv_file, newline='') as f:
        reader = list(csv.reader(f))

    cycles = []
    i = 0
    while i < len(reader):
        row = reader[i]
        if row[0].strip().lower() == 'name':
            # Start of a new cycle
            cycle = {
                "name": row[1].strip(),
                "weeks": []
            }
            i += 1
            # Read metadata rows
            while i < len(reader) and not is_date(reader[i][0]) and not reader[i][0].strip().lower() == 'name':
                key = row_key = reader[i][0].strip().lower()
                value = reader[i][1].strip() if len(reader[i]) > 1 else ''
                if key == 'best sn':
                    cycle['bestSn'] = int(value)
                elif key == 'best cj':
                    cycle['bestCj'] = int(value)
                elif key == 'best total':
                    cycle['bestTotal'] = int(value)
                elif key == 'rating':
                    cycle['rating'] = int(value)
                elif key == 'description':
                    # Merge the rest of the row into description
                    cycle['description'] = ' '.join([c.strip() for c in reader[i][1:] if c.strip()])
                i += 1

            # Read weekly training data
            while i < len(reader):
                row = reader[i]
                if row[0].strip().lower() == 'name':
                    break  # next cycle starts
                if not is_date(row[0]):
                    i += 1
                    continue
                # Clean each row, convert if possible
                data = {
                    "dateWeekStart": row[0],
                    "weeksOut": try_parse_int(row[1]),
                    "metricValues": {
                      "classic reps": try_parse_int(row[2]),
                      "squat sets": try_parse_int(row[3]),
                      "pull/DL sets": try_parse_int(row[4]),
                      "WL acc sets": try_parse_int(row[5]),
                      "non-WL acc sets": try_parse_int(row[6]),
                      "max sn %": try_parse_int(row[7]),
                      "max jk %": try_parse_int(row[8]),
                      "typical classic %": try_parse_int(row[9]),
                      "max squat %": try_parse_int(row[10]),
                      "max pull %": try_parse_int(row[11]),
                      "avg fresh": try_parse_float(row[12]),
                      "failed classic": try_parse_int(row[13]),
                      "failed sq or pull": try_parse_int(row[14])
                    }
                }
                cycle["weeks"].append(data)
                i += 1

            cycles.append(cycle)
        else:
            i += 1  # Skip irrelevant rows

    # Convert to JS
    js_object = f"export const realDataRaw = {json.dumps(cycles, indent=2)};"
    with open(js_file, 'w') as f:
        f.write(js_object)


def try_parse_int(val):
    try:
        return int(val)
    except:
        return None

def try_parse_float(val):
    try:
        return float(val)
    except:
        return None

# Example usage:
convert_csv_to_js('data.csv', 'realDataRaw.ts')
