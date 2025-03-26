### Theory Behind Nginx’s Working Mechanism

- Event-Driven Architecture

  - Unlike traditional web servers (e.g., Apache) that use a thread-per-request model, Nginx uses an event-driven model to handle thousands of connections with a few worker processes.

  - This means that a single worker can handle multiple connections without needing to spawn a new thread or process for each request.

- Asynchronous & Non-Blocking

  - Nginx does not wait for a request to finish before handling the next one. Instead, it uses asynchronous I/O.

  - This allows it to handle multiple connections simultaneously with minimal resource consumption.
  - It dioes it using an asynchronous system call (e.g., epoll_wait(), aio_read()).

- Master-Worker Process Model

  - Nginx runs with a single master process that manages multiple worker processes.

  - The master process:

    - Reads the configuration

    - Manages worker processes

    - Handles logging & restarting workers

  - Worker processes:

    - Handle actual requests

    - Use epoll (Linux) or kqueue (BSD - (Berkeley Software Distribution) is a family of Unix-like operating systems ) to efficiently manage connections

- Efficient Connection Handling Using Epoll/Kqueue

  - Instead of a loop constantly checking for active connections (like polling), Nginx uses epoll (Linux) or kqueue (BSD).

  - These are efficient kernel mechanisms that notify Nginx only when an event occurs (like new data arriving or a connection closing).

  - This makes it massively scalable.

- Zero Context Switching Overhead

  - Since Nginx avoids spawning new threads for each connection, there’s no context switching overhead (unlike multi-threaded servers).

    - Context switching overhead refers to the CPU time and resources wasted when switching between different tasks (processes or threads). very time the CPU switches from one task to another, it must:

      - Save the current task’s state (registers, memory, etc.).

      - Load the new task’s state.

      - Resume execution of the new task.

  - This makes it faster and more resource-efficient.


  #### Running multiple nginx server instances
  - Possible but not recommended. To do so create another folder just like etc/nginx (eg: etc/nginx_instance2)
  - in it rewrite all main codes inside etc/nginx/nginx.config (or any other necessary folders) and run it
