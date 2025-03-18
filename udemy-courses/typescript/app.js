"use strict";
class Project {
    constructor(title, description, people) {
        this.title = title;
        this.description = description;
        this.people = people;
    }
}
class ProjectList {
    constructor() {
        this.projects = [];
    }
    addProject(title, desc, people) {
        const newProject = new Project(title, desc, people);
        this.projects.push(newProject);
        this.render();
    }
    render() {
        console.log(this.projects);
    }
}
const projectList = new ProjectList();
console.log(projectList);
