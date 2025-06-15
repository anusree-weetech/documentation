### Todo

- auth cotrller: registerUser, LoginUser
- auth service: 
    - register: 
        - [ ] validate inout email password name. 
        - [ ] create hash, save name email p-assword in repo, attach euser to request. 
    - login: validate input email password. get email, if no eail error, create hash from ext password, copae password hashes. if not mathcn error. if good attach user name and email to request