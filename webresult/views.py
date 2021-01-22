# views file, let's see

from django.shortcuts import render


def index(request):
    params = {'f': '<p>this is my first django project</p>'}
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
    s.select(4)
    if s.display('check') == 'a':
        params = {'f' : '''<div class="alert alert-danger" role="alert">The entered data didn't matched, please try again</div>'''}
        return render(request, 'index.html', params)
    else:
        args = {'table' : s.display('t'), 'name' : name, 'sems' : s.display('x'), 'perc' : s.display('y')}
        s.clear()
        return render(request, 'output.html',args)
    
