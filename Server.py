#!flask/bin/python
from flask import Flask, abort, request, redirect, url_for, render_template,send_from_directory

import logging

app = Flask(__name__)

@app.route('/')
@app.route('/Index')
def index(): 
    return render_template('Index.html')

@app.errorhandler(404)
def page_not_found(e):
    return render_template('404.html'), 404

@app.route('/showError', methods=['GET', 'POST'])
def showErrorMessage():
    s = 'The student that you type is not found'
    return render_template(
        'ErrorPage.html', 
        errorMessage=s,
    )
if __name__ == '__main__':
    app.run(debug=True)
