from django.shortcuts import HttpResponse, redirect
import json

def index(request):
    return redirect('https://jatinsajwan3841.github.io/webresult/')

def about(request):
    from sup import result
    err = json.dumps("nf")
    name=request.GET.get('name')
    branch=request.GET.get('branch')
    try:
        name = int(name)
    except :
        try:
            name = name.lower()
        except:
            return HttpResponse(err)
    s = result(name,branch)
    if s.display('check') == 'a':
        return HttpResponse(err)
    else:
        args =  s.display('t')
        s.clear()
        data = json.dumps(args)
        return HttpResponse(data)
