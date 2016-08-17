
## 书籍
* 所有书籍放在Books目录下
* 每本书籍一个目录

### 目录结构

书名 (名字可以任意取)
    book.json 书籍信息
    catagory.json 书籍目录。只能支持到2级目录。
    [bookid].mp3 文章的音频
    [bookid].lrc 文章的信息数据

### book.json 书籍信息
{"Category":"新概念英语","ID":"08ac5587-2605-4015-a55a-9d8e39d3040b","Name":"新概念英语1","Total":102,"Version":1}

### catagory.json 书籍目录

### lrc 文章的信息数据
lrc文件的格式如果：
```
[ti:标题]
[tt:标题的翻译]
[al:书箱名]
[ar:歌词文件作者]
[or:文件序号，如：第1课。]

[本名的开始时间点]原文^翻译
```
这是一个例子：
```
[ti:A private conversation]
[tt:私人谈话]
[al:新概念英语2]
[ar:likang]
[or:Lesson 1]

[00:00.80]lesson 1  A private conversation^私人谈话

[00:06.20]First listen and then answer the question.^听录音，然后回答以下问题。
[00:12.12]Why did the writer complain to the people behind him?

[00:19.84]Last week I went to the theatre.^上星期我去看戏。
[00:23.60]I had a very good seat.^我的座位很好，
[00:26.76]The play was very interesting.^戏很有意思，
[00:30.08]I did not enjoy it.^但我却无法欣赏。
[00:32.92]A young man and a young woman were sitting behind me. They were talking loudly.^一青年男子与一青年女子坐在我的身后，大声地说着话。
[00:40.32]I got very angry.^我非常生气，
[00:42.88]I could not hear the actors.^因为我听不见演员在说什么。

[00:46.08]I turned round. I looked at the man and the woman angrily.^我回过头去怒视着那一男一女，
[00:52.80]They did not pay any attention.^他们却毫不理会。
[00:55.96]In the end, I could not bear it.^最后，我忍不住了，
[00:59.56]I turned round again.^又一次回过头去，
[01:01.76]'I can't hear a word!' I said angrily.^生气地说：“我一个字也听不见了！”
[01:06.84]'It's none of your business,' the young man said rudely.^“不关你的事，”那男的毫不客气地说，
[01:11.56]'This is a private conversation!'^“这是私人间的谈话！”
[01:15.76]end
```

和普通lrc文件相比有几点扩展：
* 使用UTF-8编码格式
* 翻译和原文之间用^分开
* 句子间的空行表示分段





