/*jshint esversion: 6 */

const userRepository = require('./../node/user_repository');

function findAll(req,res){

	function responseHanler(successData,errorData){
		if(successData !== null){
			
			for(var i =0; i<successData.length; i++){
				delete successData[i].password;
			}
			
			res.send({
				code : 200,
				data : successData
			});
		}else{
			res.send({
				code : 500,
				data : errorData
			});
		}
	}

	var result = userRepository.findAll(responseHanler);
}

module.exports = {
		findAll : findAll
};