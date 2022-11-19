const fs = require('fs'); 
const express = require('express');

const app = express();

app.get('/',(req,res)=>{
    res.send('Hello,World!');
})

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=> console.log(`server is running on ${PORT}`));
const cors = require("cors");
const corsOptions = { origin:'*', credentials:true, }
app.use(cors(corsOptions))       
const csv = require('csv-parser')
const results = []; 
app.get('/csv/*',async function(req, res){
    var origin = req.params; 
    const results = [];
    fs.createReadStream(`./covid19/csv/${origin[0]}`)
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
      res.send(results)
    });
})


make_dir = async(pathname, origin) => {

    var key = await new Promise((resolve, reject) => {
        fs.readdir(pathname, (err, files) => {
            resolve(files)
        })
    })

    var tmp_arr = [];
    for(let i=0 ;i<key.length;i++){
        if (!key[i].includes('.dcm') && !key[i].includes('.csv')){
            var obj = {};
            obj['label'] = key[i];
            var tmp_key = origin + '-' + i;
            if(origin === ''){
                tmp_key =  i.toString();
            }
            obj[`key`] = tmp_key
            var children = await make_dir(pathname + '/' + key[i], tmp_key)
            obj[`nodes`] = children
            tmp_arr.push(obj)
        }
        else{
            var obj = {};
            obj[`label`] = key[i];
            obj[`key`] = origin + '-' + i
            obj[`isOpen`] = false;
            obj[`path`] = pathname + '/' + key[i];
            tmp_arr.push(obj);
        }
    }
    return tmp_arr
}

app.get('/folder',(req,res)=>{
    make_dir('./covid19','').then((e)=>{
    res.send(e);
    })
  });

app.get('/sample_submission.csv',(req,res)=>{ 
    var readFile =fs.readFileSync("./covid19/csv/sample_submission.csv",'utf-8') ;
    res.send(readFile);
});
app.get('/train_study_level.csv',(req,res)=>{ 
    var readFile =fs.readFileSync("./covid19/csv/train_study_level.csv",'utf-8') ;
    res.send(readFile);
});
app.get('/train_image_level.csv',(req,res)=>{ 
    var readFile =fs.readFileSync("./covid19/csv/train_image_level.csv",'utf-8') ;
    res.send(readFile);
});
app.get('/download_dcm_images/*',(req,res)=>{ 
    const images = req.params
    // console.log(images)
    res.download(`./covid19/${images[0]}`);
});