const express = require('express');
const fs = require('fs');
const path = require('path');
const morgan = require('morgan');

const app = express();

// 使用 morgan 中间件记录访问日志
app.use(morgan('combined'));

// 脚本直链路由
app.get('/scripts/:filename', (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(__dirname,'driver','scripts', filename);
  
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        res.status(404).send('Script not found');
      } else {
        res.setHeader('Content-Type', 'text/plain');
        res.send(data);
      }
    });
  });

//图片直链路由
app.get('/images/:filename', (req, res) => {
  const filename = req.params.filename;
  const folderPath = path.join(__dirname, 'driver', 'images');

  findFile(folderPath, filename, (filePath) => {
    if (filePath) {
      res.sendFile(filePath);
    } else {
      res.status(404).send("Image file not found");
    }
  });
});

//视频直链路由
app.get('/videos/:filename', (req, res) => {
   const filename=req.params.filename;
   const folderPath= path.join(__dirname,'driver','videos')

   findFile(folderPath,filename,(filePath)=>{
     if(filePath){
       // 设置 Content-Type为 video/mp4
       res.setHeader("Content-Type","video/mp4");

       // 获取文件大小和范围信息
       const stat = fs.statSync(filePath);
       const fileSizeInBytes=stat.size;
      
        let range=req.headers.range;

        if(!range){
          // 如果没有指定范围，则发送整个视频文件
          return fs.createReadStream(filePath).pipe(res);
        }

         // 解析请求头中的起始位置和结束位置（如果有）
         let [start,end]=range.replace(/bytes=/,"").split("-")
        
         start=start? parseInt(start,10):0;
         end=end?parseInt(end,10):fileSizeInBytes-1;

         // 设置响应头，指定分段传输的范围和文件大小
         res.setHeader("Content-Range",`bytes ${start}-${end}/${fileSizeInBytes}`);
         res.setHeader("Accept-Ranges","bytes");
         
        // 计算每个分段的长度
        const chunkSize = (end-start)+1;

        // 创建一个可读流，并使用 fs.createReadStream 的 options 参数来指定起始位置和结束位置
        const stream = fs.createReadStream(filePath,{ start, end });

       // 将每个分段作为数据块进行发送，以实现跳转播放进度
       stream.on('open', () => {
          res.status(206);  // 使用 206 Partial Content 状态码表示部分内容被成功返回

          let bytesRead=0;
          
           stream.on('data', (chunk) => {
              bytesRead += chunk.length;
              if(bytesRead>chunkSize){
                 chunk=chunk.slice(0,(chunk.length-(bytesRead-chunkSize)))
                  bytesRead-= bytesRead-chunkSize; 
               }
                res.write(chunk);
            });
           
            stream.on('end', () => {
               console.log(`Sent ${filename} successfully.`);
                res.end();
             });
            
             stream.on('error',(err)=>{
                 console.error(`Error streaming file:`, err);
                  res.sendStatus(500).send(err.message)
            })
      })
     }else{
           res.status(404).send("Video file not found");
     }
   })
});

function findFile(folderPath,filename,callback){
   fs.readdir(folderPath,{withFileTypes:true},(err1,fileOrDirs)=>{
          for(const item of fileOrDirs){
              if(item.isFile() && item.name===filename){
                callback(path.join(folderPath,item.name))
                return ;
              }
          }

           for(const dir of files.filter(file=>file.isDirectory())){
             var dirFilePath=path.resolve(dir,name)
             findImageInDir(dirFilePath,filename,callback)
           }
})
}

function findImageInDir(directory,filename,callback){

        fs.readdir(directory,{withFilesAndDirectories:true},(err2,files)=>{
             if(err2){
               console.error("Error reading folder:",err);
               callback(null)
               return;
             }

            for(const file of files){
              const filePath=path.join(directory,file.name)
                 fs.stat(filePath,(err3,stats)=>{
                      if(err3){
                        console.error("Error getting file stats:", err);
                          return;
                      }
                     if(stats.isDirectory()){
                       findImageInDir(filePath,filename,callback)
                     }else if(file===filename){
                         callback(filepath);
                     }
                 })
            }
        })
}

app.listen(3049 , () => {
   console.log("Server is running on port ",3049);
});