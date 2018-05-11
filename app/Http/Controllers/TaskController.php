<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Task;

class TaskController extends Controller
{
    public function index()
    {
        $tasks = Task::orderBy('id', 'DESC')->get();
        return $tasks;
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'keep' => 'required'
        ]);

        Task::create($request->all());

        return;
    }

    public function edit($id)
    {
        $task = Task::findOrFail($id);
        //formulario
        return $task;
    }

    public function update(Request $request, $id)
    {
        $this->validate($request, [
            'keep' => 'required'
        ]);
        Task::where('id',$id)->update($request->all());

        return;
    }

    public function destroy($id)
    {
        $task= Task::findOrFail($id);
        $task->delete();
    }
}
