import sys
import re
# Enter your code here. Read input from STDIN. Print output to STDOUT
def transform():
    for line in sys.stdin:

        # Capitalize the first character
        line = line.lower()
        line = line[0].capitalize() + line[1:]

        # Remove extra spaces
        line = ' '.join(line.split())

        # Remove capital letters except 'I'
        line = ' '.join([c.upper() if c == 'i' else c for c in line.split()])
        line = re.sub(r'\s\.', '.', line)

        if line[-1] != '.':
            line +='.'

        special_chars = re.findall(r'[^a-zA-Z0-9\s.]', line)
        unique_special_chars = list(dict.fromkeys(special_chars))
        for char in unique_special_chars:
            line = line.replace(char, f"'{char}'")


        special_count = len(special_chars);
        numeric_count = sum(1 for char in line if char.isdigit())

        print(line)
        print("Number of Special Characters:",special_count)
        print("Number of Numeric Values:",numeric_count)


if __name__ == "__main__":
    transform()