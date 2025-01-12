const xlsx= require('xlsx');
const workbook = xlsx.readFile("c:\\Users\\Admin\\Documents\\cat.xlsx");

const sheetname = workbook.SheetNames[0]
const sheet = workbook.Sheets[sheetname];
const  data =xlsx.utils.sheet_to_json(sheet ,{header:1});
console.log('ExcelData:',data);
data.forEach((row, index) => {
console.log('Row${index}:',row);
console.log("SheetName:",sheetname)
});