export default class treeNode {
    constructor(node){
        this.label = node.label
        this.children = node.children
        this.unfold = true; // true --展开 false --折叠
        this.treeNode = this.render()
        this.addEvent()
    }
    open(){
        //点击之后 是所有子元素关闭
        this.unfold = true;
        this.treeNode.setAttribute('status','unfold')
        this.styleSet()
    }
    styleSet(){
        var status = this.unfold?'fold':'unfold'
        this.switchChildren(status)
    }

    close(){
        this.unfold = false;
        this.treeNode.setAttribute('status','fold')
        this.styleSet()
    }

    switchChildren(status){
        setTimeout(()=>{
            for(let i=0;i<this.treeNode.children.length;i++){
                this.treeNode.children[i].className =  `yc-tree--${status}`
            }
        },0)
    }
    
    render(){
        var treenode = document.createElement('div')
        treenode.style = 
        `   border:1px solid black;
            width:50%;
            display:inline-block;
            margin:10px;`
        treenode.innerText = this.label
        treenode.setAttribute('status','unfold')
        return treenode
    }

    addEvent(){
        var that = this
        var unfold = this.unfold
        that.treeNode.addEventListener('click',function(e){
                e.stopPropagation()
                unfold = !unfold
                console.log('状态-->',that.unfold)
                unfold && that.close()
                !unfold && that.open()
            }/*(that)*/
        ) 
    }
    
    remove(){
        this.treeNode.removeEventListener('click')
    }
}