import axios from "axios"
const Axios = axios.create({
	baseURL: 'https://sheets.googleapis.com/v4/spreadsheets/1Tqe4ZacAPHOBLrmsBArL2ndUTpICCtuZOqgl1c0-VEs/values/Sheet1!A1:P22?key=AIzaSyD4-YOz8nUABn4Cpe3OS8FYG7RFJVDBRik',
	timeout: 12000,
	// headers: {
	// 	'Content-Type': 'application/json'
	// }
});
export const fetchData = async( ) => {
	const config = {
		method: 'get'
	};
	return await Axios( config ).then(async( response ) => {
    let result = []
		const res = response.data.values
    const columns = res.shift()
    // console.log(response.data.values)
    // while (result.length<res.length) {
    //   console.log("running while")
    //   const item = {}
    //   res[0].forEach((val,index)=>{
    //     console.log("running foreach")
    //     item[val]=res[result.length+1][index]
    //     console.log(item)
    //   })
    //   result.push(item)
    //   console.log(result)
    // }
    // console.log(result)

    console.log(columns)
    console.log(res)
    const newArray = res.map((resVal)=>{
      // console.log(resVal)
      const item = {}
      columns.forEach((val,index)=>{
        // console.log("running foreach")
        item[val]=['skill_tags'].includes(val)?resVal[index].split(',').map(function(item) {
          return item.trim();
        }):resVal[index]
        // console.log(item)
      })
      return item
    })
    console.log(newArray)
		return newArray;
	}).catch(( error ) => {
		return error;
	});
}