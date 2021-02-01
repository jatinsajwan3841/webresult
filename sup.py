from openpyxl import load_workbook
from openpyxl import Workbook
from prettytable import PrettyTable

x = PrettyTable()
x.format = True


class result:
    def __init__(self, name, branch):
        self.wb = Workbook()
        self.sheet = self.wb.active
        self.name = name
        self.branch = branch
        self.excelfiles = ['dat/B. TECH. I SEM DEC 18.xlsx', 'dat/B. TECH. II SEM JUNE 2019.xlsx',
                           'dat/B. TECH. III SEM DECEMBER 2019.xlsx', 'dat/B. TECH. IV SEM DECEMBER 2020.xlsx']
        self.xval = []
        self.yval = []
        self.letter = 'a'
        self.total_marks = [0, 0]
        self.select()

    def select(self):

        for self.sem in range(0, 4):
            self.semn = load_workbook(
                self.excelfiles[self.sem], data_only=True)
            self.currentSheet = self.semn[self.branch]

            self.search()
            
            if self.letter == 'a':
                print('data not matching')
                if self.sem == 2:
                    break
                continue

            self.vals()

    def search(self):   # searching name
        for row in range(7, self.currentSheet.max_row + 1):
            for column in "DE":
                self.cell_name = "{}{}".format(column, row)
                ex = self.currentSheet[self.cell_name].value
                if type(ex) == str:
                    ex = ex.strip()
                    ex = ex.lower()
                if ex == self.name:
                    self.letter = row
                    return 0

    def vals(self):                          # saving values for table and plot
        for row in range(4, 5):
            for column in range(1, self.currentSheet.max_column + 1):
                tem = self.currentSheet.cell(row, column).value
                if type(tem) == str:
                    tem = tem.strip()
                    tem = tem.lower()
                    if tem == 'result':
                        column -= 1
                        row += 2
                        x.field_names = ["Sem", "Marks", "Percentage"]
                        self.yval.append(self.currentSheet.cell(self.letter, column).value / self.currentSheet.cell(row,
                                                                                                                    column).value * 100)
                        self.xval.append(self.sem)
                        x.add_row([self.sem, "{}/{}".format(self.currentSheet.cell(self.letter, column).value,
                                                            self.currentSheet.cell(row, column).value), "{} %".format(
                            self.currentSheet.cell(self.letter, column).value / self.currentSheet.cell(row,
                                                                                                       column).value * 100)])
                        self.total_marks[0] = self.total_marks[0] + \
                            self.currentSheet.cell(
                                self.letter, column).value
                        self.total_marks[1] = self.total_marks[1] + \
                            self.currentSheet.cell(row, column).value
                        return 0

    def display(self, v):
        if v == 'check':
            return self.letter
        elif v == 'x':
            return self.xval
        elif v == 'y':
            return self.yval
        elif v == 't':
            x.add_row(["Total :", "{}/{}".format(self.total_marks[0], self.total_marks[1]),
                       "{} %".format((self.total_marks[0]/self.total_marks[1])*100)])
            return x.get_html_string(attributes={"name": "restable", "class": "table table-striped table-bordered table-hover"})

    def clear(self):
        x.clear()
        self.xval.clear
        self.yval.clear
