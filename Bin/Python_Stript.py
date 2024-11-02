# this is for michael indepentent #

# imports 
import json 

# leader board function for storying data

def sort(UserData): # sorts the score in order
    return UserData['score']

def read(UserData: list , file_path : str):
    """
    reads the data from file json type
    """
    try:
        with open(file_path, 'r') as input_file: 
            UserData += json.load(input_file)
    except json.decoder.JSONDecodeError:
        print('no UserData within file')
    # sort UserData
    UserData.sort(reverse=True, key=sort)

def update(UserData : list , file_path : str ):
    """
    Create / Update json file
    """
    # Read UserData from the JSON file
    read()

    # Write the complete UserData to the JSON file
    with open(file_path, 'w') as file:
        json.dump(UserData, file , indent = 1)

# main core

