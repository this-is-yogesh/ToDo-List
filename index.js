import ReactDOM from 'react-dom';
import React from 'react';
import './index.css'


class AddTask extends React.Component{

    constructor(props){
        super(props);
        this.state = {
        taskDesc :''
        }
    } 
    handletaskTextChange(e){
this.setState({
    taskDesc : e.target.value
}) 
}

    
handleAddTextClick(){
this.props.handlertoCollectTaskInfo(this.state.taskDesc);
this.setState({
    taskDesc:''
})
    }
    render(){
        return (
<form>
    <input type='text' value={this.state.taskDesc} onChange ={(e)=>this.handletaskTextChange(e)} />
    <input type='button' value='Add-Tasks' onClick={()=>this.handleAddTextClick()}/>
</form>
        );
    }
}

class TaskList extends React.Component{

    handleTaskClick(taskDesc){
        this.props.handlertoCollecttaskClickInfo(taskDesc);
    }
    render(){
      let  lists = [];
      
      for(let i=0;i<this.props.tasks.length;i++){
          let task = this.props.tasks[i];
          let snapAction ;

          if(task.isFinished){
              snapAction = (
<span class="material-icons" onClick={()=> this.handleTaskClick(task.desc)}>undo</span>
              );
          }
          else{
              snapAction = (
                <span class="material-icons" onClick={()=> this.handleTaskClick(task.desc   )}>done</span>
              );
          }
          let listitem = (
          <div key={i}>
              <span>{task.desc}</span>
           {snapAction}
              </div>);
          lists.push(listitem);
      }
        return (
                <div className={this.props.purpose == "Todo" ? 'todo' : 'finished'}>
                    <div className='list-container'>
                   <div  className='title'> {this.props.purpose}</div> 

                   <div className='content'>
                       {lists}
                       </div>     
                       </div> 
                       </div>
        )//divides the page into todo and finished
        }
    }//props is used to communicate the parent compnent to the child compnt

class App extends React.Component{ // React.component is the parent component
    //it represents the whole page 
constructor(props){
    super(props);
    this.state = {
        tasks : [{
            desc : " Switch off Light",
            isFinished : false
        },{
            desc : " Turn on light ",
            isFinished : false 
        },{
            desc : " Make tea",
            isFinished : true
        },{
            desc : " Make Dinner",
            isFinished : true
        }]
}
}
handleNewtask(taskDesc){
    let oldtasks = this.state.tasks.slice();
    oldtasks.push({
        desc : taskDesc,
        isFinished : false
    }

    );
    this.setState({
        tasks : oldtasks
    })

}
handleTaskStatusUpdate(taskDesc, newStatus){
    let oldtasks = this.state.tasks.slice();

    let taskitem = oldtasks.find(ot => ot.desc == taskDesc);
    taskitem.isFinished=newStatus;
  this.setState({
      tasks:oldtasks
  }

  )  
}




    render(){
       let tasks = this.state.tasks;
       let todoTasks = tasks.filter(t => t.isFinished == false);
       let doneTasks = tasks.filter(t=> t.isFinished == true);
        return (
            <>
                <div className='add-tasks'>
                    <AddTask handlertoCollectTaskInfo={(taskDesc) => this.handleNewtask(taskDesc)}  />
                    </div>
                    <div className = 'tasks-list'>
                    <TaskList handlertoCollecttaskClickInfo={(taskDesc)=>this.handleTaskStatusUpdate(taskDesc,true)} tasks = {todoTasks} purpose="ToDo" forStyling="todo"/>
                      <TaskList handlertoCollecttaskClickInfo={(taskDesc)=>this.handleTaskStatusUpdate(taskDesc,false)}tasks= {doneTasks} purpose = "Finished" forStyling="finished" />
                </div>
                </>
        );
    }
}

ReactDOM.render(<App/> , document.getElementById("root"));