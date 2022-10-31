#!/usr/bin/env python3

import re
import sys

TARGET_FILE = 'android/gradle.properties'


def main():
    # check version name input
    version_name = sys.argv[1]
    if not re.match(r'^([0-9]+)\.([0-9]+)\.([0-9]+)$', version_name):
        print('Wrong version name!')
        return
    # read target file
    with open(TARGET_FILE, 'r') as f:
        data = f.read()
    # extract version code and increment
    version_code = int(re.search(r'APP_VERSION_CODE=([0-9]+)', data).group(1)) + 1
    # replace data string
    data = re.sub(r'APP_VERSION_CODE=[0-9]+', f'APP_VERSION_CODE={version_code}', data)
    data = re.sub(r'APP_VERSION_NAME=[0-9]+\.[0-9]+\.[0-9]+', f'APP_VERSION_NAME={version_name}', data)
    # write to target file
    with open(TARGET_FILE, 'w') as f:
        f.write(data)


if __name__ == '__main__':
    main()
