#!/bin/bash

# 打印欢迎消息
echo "这是一个没什么意义的脚本示例"

# 生成一个随机数
random_number=$((RANDOM % 100))

# 循环输出一些无聊的文本
for i in {1..5}; do
  echo "这是第 $i 次循环。"
done

# 判断随机数的奇偶性
if ((random_number % 2 == 0)); then
  echo "随机数 $random_number 是偶数。"
else
  echo "随机数 $random_number 是奇数。"
fi

# 创建一个空文件
touch example.txt
echo "已创建文件 example.txt"

# 删除刚创建的文件
rm example.txt
echo "已删除文件 example.txt"

# 结束脚本
echo "脚本示例结束"
