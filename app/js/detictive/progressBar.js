/**
 * Created by AliKhan on 2016/8/22.
 */

//创建一个指令,第一个参数是被附加的html元素
//当DOM中有相关元素则该指令被触发激活
myapp.directive('region', function() {
    //定义一个指令对象
    var directive = {};
    
    //限制directive = "E"，则为一个标签element
    directive.restrict = 'E';
    
    //scope is used to distinguish each student element based on criteria.
    directive.scope = {
        total: "=",
        start: "=",
        end: "="
    };
    
    //模板替换完整的标签文本
    directive.template = "<div style='position:absolute;top:-3px;font-size:10px;text-align:center;background: indianred;height: 3px;width:{{(end - start)/total*100}}%;left:{{start/total*100}}%;'></div>";
    
    //在应用程序初始化期间被称为编译。AngularJS html页面加载时调用一次
    return directive;
});   