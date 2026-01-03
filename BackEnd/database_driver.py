from configparser import ConfigParser
import psycopg2
import time

CONFIG_PATH = "./dblogin.txt"

class DatabaseDriver:
    def __init__(self):
        self.conn, self.cur = self.__connect()
    def read_config(self, path=CONFIG_PATH):
        with open(path, "r") as f:
            dbname = f.readline()
            user = f.readline()
            password = f.readline()
            host = f.readline()
        return dbname, user, password, host
    def __connect(self):
        conn = None
        dbname, user, password, host = self.read_config()
        print("Connecting to DB")
        dsn = f"dbname={dbname} user={user} password={password} host={host}"
        while True:
            try:
                conn = psycopg2.connect(dsn=dsn)
                break
            except psycopg2.OperationalError as e:
                print(e)
                print("DB not ready yet, sleeping for 2 seconds")
                time.sleep(2)
        print("Connected!")
        cur = conn.cursor()
        print("Cursor initialized")

        return conn, cur

    def execute(self, query:str):
        self.cur.execute(query)
        return self.cur.fetchall()
    
    def close(self):
        if self.conn is not None:
            self.cur.close()
            self.cur = None
            self.conn.close()
            self.conn = None
            print("Closed DB!")
        else:
            raise Exception("Connection not open, cannot close...")