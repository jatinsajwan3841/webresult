from openpyxl import load_workbook
from openpyxl import Workbook
from prettytable import PrettyTable

x = PrettyTable()
letter = 'a'



class result:
    def __init__(self,name,clgid,branch):
        self.wb = Workbook()
        self.sheet = self.wb.active
        self.name = name
        self.name = name.lower()
        self.clg_id = clgid
        self.branch=branch
        self.xval = []
        self.yval = []


    def select(self, sem):

        self.sem = sem

        while True:

            if self.sem == 1:
                self.semn = load_workbook('dat\\B. TECH. I SEM DEC 18.xlsx', data_only=True)
                self.head = 1
                self.body = 4
                self.currentSheet = self.semn[self.branch]
            elif self.sem == 2:
                self.semn = load_workbook('dat\\B. TECH. II SEM JUNE 2019.xlsx', data_only=True)
                self.head = 7
                self.body = 10
                self.currentSheet = self.semn[self.branch]
            elif self.sem == 3:
                self.semn = load_workbook('dat\\B. TECH. III SEM DECEMBER 2019.xlsx', data_only=True)
                self.head = 13
                self.body = 16
                self.currentSheet = self.semn[self.branch]

            for row in range(1, self.currentSheet.max_row + 1):         #searching name or ID
                for column in "DE":
                    self.cell_name = "{}{}".format(column, row)
                    ex = self.currentSheet[self.cell_name].value
                    if ex != None and type(ex) != int:
                        ex = ex.strip()
                        ex = ex.lower()
                    if ex == self.clg_id or ex == self.name:
                        global letter
                        letter = row
                        break

            if letter == 'a':
                print('Either you are LE, wrna bahut galat input maara tune')
                break

            for row in range(4, 5):                                     #saving values for table and plot
                for column in range(1, self.currentSheet.max_column + 1):
                    tem = self.currentSheet.cell(row, column).value
                    if type(tem) == str:
                        tem = tem.strip()
                        tem = tem.lower()
                    if tem == 'result':
                        column -= 1
                        row += 2
                        x.field_names = ["sem", "total marks", "percentage"]
                        self.yval.append(self.currentSheet.cell(letter, column).value / self.currentSheet.cell(row,
                                                                                                          column).value * 100)
                        self.xval.append(self.sem)
                        x.add_row([self.sem, "{}/{}".format(self.currentSheet.cell(letter, column).value,
                                                            self.currentSheet.cell(row, column).value), "{} %".format(
                            self.currentSheet.cell(letter, column).value / self.currentSheet.cell(row,
                                                                                                  column).value * 100)])
                        break

            for row in range(4, 7):                                      #saving values to excel file
                for column in range(1, self.currentSheet.max_column + 1):
                    self.sheet.cell(self.head, column).value = self.currentSheet.cell(row, column).value
                self.head += 1

            for column in range(1, self.currentSheet.max_column + 1):
                self.sheet.cell(self.body, column).value = self.currentSheet.cell(letter, column).value

            #self.wb.save("result.xlsx")
            break

    def display(self, v):
        if v == 'x':
            return self.xval
        elif v == 'y':
            return self.yval
        elif v == 't':
            return x.get_html_string()
    def clear(self):
        x.clear()
        self.xval.clear
        self.yval.clear
