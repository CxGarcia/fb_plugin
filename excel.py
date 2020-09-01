import pandas

excel_data_df = pandas.read_excel('sample.xlsx', sheet_name='Employees')

json_str = excel_data_df.to_json(orient='records')


print('Excel Sheet to JSON:\n', json_str)