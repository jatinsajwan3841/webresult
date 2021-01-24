# views file, let's see

from django.shortcuts import render


def index(request):
    return render(request, 'index.html')

def about(request):
    from sup import result
    name=request.GET.get('name')
    branch=request.GET.get('branch')
    try:
        name = int(name)
    except :
        name = name.lower()
    s = result(name,branch)
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
    
