
## 书籍
* 所有书籍放在Books目录下
* 每本书籍一个目录
```
书籍目录的命名规范：
类别-书名-原始语言-学习者语言-版本-随机标识

例如：
新闻-VOA英语-EN-CN-1.0-30F5
```

### 目录结构
- 书籍目录
    - book.json 书籍信息（必须）
    - logo.png 书籍的logo（尺寸：64px *　64px）
    - book_bar.png 书籍的图片（尺寸：）
    - catagory.json 书籍目录（必须）
    - [articleFileName].mp3 每篇文章的音频
    - [articleFileName].lrc 每篇文章的信息数据

### book.json 书籍信息
```JSON
{"category":"新闻", "name":"VOA英语", "sourceLang":"EN", "targetLang":"CN", "id":"30F5", "total":102, "version":1, "author":"likang"}
```

### catagory.json 书籍目录
* 此文件用来组织每一篇文章。每篇文章的数据表示为：
```JSON
{"title":"Volcanoes ","titleTranslation":"火山","duration":82524,"mediaSize":330096,"order":"Lesson 67","file":"NCE267"}
```

* 只能支持到2级目录。
* catagory.json的完整表示如下：
```JSON
{"category":"新闻", "name":"VOA英语", "sourceLang":"EN", "targetLang":"CN", "id":"30F5", "total":102, "version":1, "author":"likang"}
```

### lrc 文章的信息数据
lrc文件的格式如果：
```
[or:文件序号，如：第1课。]
[ti:标题]
[tt:标题的翻译]
[al:书箱名]
[ar:文章作者]
[by:歌词文件作者]

[本名的开始时间点]原文^翻译
```
这是一个例子：
```
[or:Lesson 1]
[ti:A private conversation]
[tt:私人谈话]
[al:新概念英语2]
[ar:likang]

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
* 歌词文件由两部分组成：前面是一组参数说明；后面是一组句子
* 参数说明没有顺序，如果没有值可以不写。
* 翻译和原文之间用^分开
* 句子间的空行表示分段
* 可以只有时间点没有原文和翻译






