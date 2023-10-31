function performTask(taskNumber: number) {
  return new Promise<void>((resolve, _reject) => {
      console.log(`Task ${taskNumber} completed`);
      resolve()
    // 模拟异步操作
  });
}

function executeTasks(taskCount: number) {
  let currentTask = 1;

  function runNextTask() {
    if (currentTask <= taskCount) {
      performTask(currentTask)
        .then(() => {
          currentTask++;
          runNextTask(); // 递归调用来执行下一个任务
        })
        .catch((error) => {
          console.error("An error occurred:", error);
        });
    } else {
      console.log("All tasks completed");
    }
  }

  runNextTask();
}

export {
    executeTasks
}