const Clarifai = require ('clarifai');
const app = new Clarifai.App({
 apiKey: '7f7951f7ee7b4fcc90f8ab7d1b32a437'
});
const handleApiCall = (req, res)=>{
	app.models.predict(Clarifai.FACE_DETECT_MODEL,req.body.input)
	.then(data =>{
		res.json(data);
	})
	.catch(err=>res.status(400).json('Unable to work with API'))
}
const imageHandler = (req, res, db)=>{
	const {id} = req.body;
	db('users').where('id', '=', id)
	.increment('entries', 1)
	.returning('entries')
	.then(entries =>{
		res.json(entries[0]);
		})
	.catch(err=> res.status(400).json('uable to return entries'))
}

module.exports = {
	imageHandler: imageHandler,
	handleApiCall: handleApiCall
}