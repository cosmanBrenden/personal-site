import os
import io
import random

DEFAULT_DIR = "./content"
VALID_FTYPES = {"jpg", "jpeg", "png", "mp4", "mp3", "html", "webm", "gif"}
BACKGROUND_LIST_FP = "./backgrounds.txt"

class FileGrabber:
    def __init__(self):
        self.__ensure_dir_exists()
        self.__ensure_background_list_exists()
        self.background_filepaths = self.__get_background_list()
    def __ensure_dir_exists(self):
        if not os.path.exists(DEFAULT_DIR):
            os.makedirs(DEFAULT_DIR)
    def __ensure_background_list_exists(self):
        if not os.path.exists(BACKGROUND_LIST_FP):
            with open(BACKGROUND_LIST_FP, "w") as f:
                f.write("")
    def __get_background_list(self):
        with open(BACKGROUND_LIST_FP, "r") as f:
            raw_str = f.read()
        raw_str = raw_str.replace(" ", "")
        raw_str = raw_str.replace("\n", "")
        return raw_str.split(",")
    def get_filepath(self, fname:str):
        ftype = fname.split(".")[-1]
        if ftype not in VALID_FTYPES:
            raise Exception(f"Invalid filetype \"{ftype}\" for file \"{fname}\"")
        fullpath = os.path.join(DEFAULT_DIR, fname)
        if not os.path.exists(fullpath):
            raise Exception(f"No file \"{fname}\" in the database!")
        
        return fullpath

    def get_background(self):
        num_bgs = len(self.background_filepaths)
        fname = self.background_filepaths[random.randint(0,num_bgs-1)]
        
        return self.get_filepath(fname), fname

