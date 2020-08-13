[
    {
        label:'a',
        children:[
            {
                label:'b'
            }
        ]
    },
    {
        label:'c',
        children:[
            {
                label:'d'
            }
        ]
    }
]


+ 所有节点的折叠展开事件，针对子元素
+ 节点不存在子元素时，点击不会触发展开事件


> 每一个节点是一个treenode对象
> 每个节点属性
> + tree id
> + tree label
> 节点事件
> + 展开
> + 关闭
> + 拖拽？