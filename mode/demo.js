class Subject{
  constructor(){
    this.state=0
    this.observers=[]
  }
  getState(){
    return this.state
  }
  setState(state){
    this.state=state
    this.notifyAllObservers()
  }
  notifyAllObservers(){
    this.observers.forEach(observer => {
      observer.update()
    });
  }
  attach(observer){
    this.observers.push(observer)
  }
}
class Observer{
  constructor(name,subject){
     this.name=name
     this.subject=subject
     this.subject.attach(this)
  }
  update(){
    console.log('更新视图啦')
  }
}
let s=new Subject()
let o1=new Observer('o1',s)
s.setState(1)
