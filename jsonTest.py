import json
import itertools
from pprint import pprint

# -*- coding: utf8 -*-
with open('keyword.json') as data_file:    
    data = json.load(data_file)
    print type(data)

    nameList = []
    sizeList = []
    jsonList = []
    for ele in data.keys():
        name = 'name', ele.encode('utf8')
        nameList.append(name)

    for ele in data.values():
        size = 'size',ele   
        sizeList.append(size)

    a = nameList[5][1]
    print a

    for x in range(0, len(nameList)):
        aaa = nameList[x][1].decode('utf8')
        ele = {nameList[x][0]:aaa, sizeList[x][0]:sizeList[x][1]}
        if ele.get('size') > 100 and len(aaa) > 1:
            jsonList.append(ele)

    #print jsonList
    jsonData = json.dumps(jsonList)
   # print jsonData
    with open('aaa.json', 'w') as f:
        f.write('{')
        f.write(repr("'name'")+':'+repr("'flare'")+','+repr("'children'")+':')
        for ele in jsonData:
            f.write(ele)
        f.write('}')



