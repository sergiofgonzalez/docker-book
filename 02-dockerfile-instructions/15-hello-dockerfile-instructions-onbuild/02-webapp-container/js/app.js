(function () {
  "use strict";

  /* the Model: contains all the state, data and application logic */
  var model = {
    user: "Sergio"
  };

  /* define todoApp module: no deps needed */
  var app = angular.module("todoApp", ["todoAppHeaderModule", "todoAppTaskFormModule"]);

  app.run(["$http", function ($http) {
    $http
      .get("/mock-data/todo-items.json")
      .then(res => model.items = res.data);
  }]);

  /* the Controller: takes user input and figures out what it means in the model */
  app.controller("ToDoCtrl", function () {
    this.todoInfo = model;

    /* return tasks not completed */
    this.getPendingTasks = function () {
      if (!this.todoInfo.items) {
        return [];
      }
      return this.todoInfo.items.filter(item => !item.done);
    };

    /* return a bootstrap class that changes the color of the tag */
    this.getWarningLevelClass = function () {
      var pendingTasksCount = this.getPendingTasks().length;
      if (pendingTasksCount <= 3) {
        return "tag-success";
      } else {
        return "tag-warning";
      }
    };

    /* add a new item to the list of tasks */
    this.addNewItem = function (actionText) {
      this.todoInfo.items.push({action: actionText, done: false});
    };

    /* control state of showCompleted checkbox */
    this.showCompleted = true;

  });

  /* filterByCheckedStatus AngularJS custom filter */
  app.filter("filterByCheckedStatus", function () {
    return function(items, showCompleted) {
      if (!items) {
        return [];
      }
      return items.filter(item => !item.done || showCompleted);
    };
  });

})();