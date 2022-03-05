#!/bin/bash
    
# "postcompile": "cd ./app-packages/roothub-codegen && pwd && yarn build",
# "prebuild": "yarn",
# 本机 An unexpected error occurred: "Cannot create property '-npm-taobao-org-mirrors' on string '{\"-npm-taobao-org-mirrors\":true}'".
# 改成shell执行绕过

cd ./app-packages/roothub-codegen 
pwd
yarn
yarn build
echo '构建完成！'
cd ../../
ls -l templates/codegen