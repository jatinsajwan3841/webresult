# views file, let's see

from django.shortcuts import render 


def index(request):
    params = {'name': 'first django project'}
    return render(request, 'index.html', params)

def about(request):
    from sup import result
    name=request.GET.get('name')
    clgid=request.GET.get('clgid')
    branch=request.GET.get('branch')
    s = result(name,clgid,branch)
    s.select(1)
    s.select(2)
    s.select(3)
    
    args = {'table' : s.display('t'), 'name' : name, 'sems' : s.display('x'), 'perc' : s.display('y')}
    return render(request, 'output.html',args)
