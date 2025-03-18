class Project {
  constructor(
    public title: string,
    public description: string,
    public people: number
  ) {}
}

class ProjectList {
  private projects: Project[] = [];

  addProject(title: string, desc: string, people: number) {
    const newProject = new Project(title, desc, people);
    this.projects.push(newProject);
    this.render();
  }

  private render() {
    console.log(this.projects);
  }
}

const projectList = new ProjectList();
console.log(projectList);
