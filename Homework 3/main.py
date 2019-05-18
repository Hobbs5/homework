import os
import csv

row_counter = 0 
running_total = 0
greatest_profit = 0
lowest_profit = 0
greatest_profit_date = ""
lowest_profit_date = ""
first_profit = 0
last_profit = 0

print("Financial Analysis") 
print("----------------------------")
csvpath = os.path.join("Resources", "budget_data.csv")
# print(csvpath)

with open(csvpath, newline="") as csv_budget_data:
    csvreader = csv.reader(csv_budget_data, delimiter=",")
    csv_header = next(csvreader)

    for row in csvreader:
        row_counter = row_counter +1
        # row_counter += 1
        running_total = int(row[1]) + running_total
        if int(row[1]) > greatest_profit:
            greatest_profit = int(row[1])
            # print(greatest_profit)
            greatest_profit_date = row[0]
            # print(greatest_profit_date)
        elif int(row[1]) < lowest_profit:
            lowest_profit = int(row[1])
            # print(lowest_profit)
            lowest_profit_date = row[0]
            # print(lowest_profit_date)
        if row_counter == 1:
            first_profit =  int(row[1])
        else: 
            last_profit = int(row [1])





        


print("Total months: " + str(row_counter))
print((running_total)
# print(f'Woah this here is text and this: {running_total} is running total')
# print(f'{running_total/1000:.2f} is running total/1000 formatted to 2 decimal places, and btdubs you can hsve more vairables like {last_profit}, which is lastprofit')

# Average
print((last_profit - first_profit) / (row_counter -1))

text_output_path = os.path.join("py_output_path.txt")

with open (text_output_path, 'w') as text_file:
    text_file.write("\nFinancial Analysis") 
    text_file.write("\n----------------------------")
    text_file.write("\nTotal months: " + str(row_counter))
    text_file.write("\n The total cells are " + str(running_total))




