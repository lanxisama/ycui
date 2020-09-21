export default class treeNode {
    constructor(node){
        this.label =node.label  
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
                this.treeNode.children[i].className = `yc-tree--leaf yc-tree--${status}`
            }
        },0)
    }
    
    render(){
        var treenode = document.createElement('span');
        var icon = this.children?'yc-tree--open':''
        treenode.className = `yc-tree ${icon}`

        console.log(`节点: ${this.label}  ${this.children} ${treenode.className}`)

        treenode.style = 
        `   border:none;
            width:100%;
            display:inline-block;
            text-align: left;
            padding-left:10px;
            background: transparent;`
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
                unfold && that.close()
                !unfold && that.open()
                that.switchIcon()
            }/*(that)*/
        ) 
 
    }
    switchIcon(){
        var status = this.unfold;
        if(this.children){
            this.treeNode.className = `yc-tree yc-tree--${status?'close':'open'}`
        }else{
            this.treeNode.className = `yc-tree yc-tree-leaf`
        }
        console.log('--->',this.treeNode.className)
    }
    remove(){
        this.treeNode.removeEventListener('click')
    }
}