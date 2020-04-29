# 每周总结可以写在这里

本周我学习了JS中表达式、语句和对象的相关知识。其中给我收获最大的是表达式。在这一节中，我了解了很多从前没注意过的操作符优先级顺序，尤其是对于MemberExpression、New和CallExpression之间的优先级关系。此外，我还了解了new.target的含义与使用方式。这是一个我之前很少接触到的功能，也从未想过有实践中的需要。Boxing和unboxing部分的讲解也对我启发很大，尤其是toPrimitive一段，我了解到toString和valueOf其实都是toPrimitive的缺省。

在语句和对象一节中，我了解到很多之前没注意到的作用域问题，也顺便了解了作用域和上下文之间的区别。尤其是try-catch语句那里，了解几个语句分别的作用域对编程的帮助很大。作为一个C系语言程序员，JS的原型思想对我在面向对象的编程实践中有很多启发。


## 根据课上老师的示范，找出JavaScript标准里所有的对象。分析有哪些对象是我们无法实现出来的，这些对象都有哪些特性？写一篇文章，放在学习总结里。

ECMA262标准里无法实现的对象有：Bound function, Array, String, Arguments, Integer-Indexed, Module Namespace, Immutable Prototype

Bound function：和普通function不同，没有词法上的上下文，仅作为一个原函数的wrapper而存在。
Array：Array的length属性无法手动修改，而是根据最大下标自动变化。
String：有一个自带属性length，无法手动修改，根据string长度自动变化。
Arguments：数组下标由调用函数的参数列表决定。
Integer-Indexed：下标运算与正常不同，和内存中的数据分布绑定。
Module Namespace：用于暴露从JS模块导出的绑定，并且无法扩展。其中有多个键值对，每个对应该模块的一个binding name。每个键值对又有三个属性：[[Writable]]: true, [[Enumerable]]: true, [[Configurable]]: false。
Immutable Prototype：例如Object.prototype就是一个Immutable prototype。它是所有对象的默认原型，因此没有原型。