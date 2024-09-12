from datetime import datetime, date
from flask import Blueprint, jsonify, redirect, request, url_for, render_template
from flask_login import current_user, login_required
from website.models import Vote
from website.utils import vote_class_to_dict

vote = Blueprint("vote", __name__)

# @login_required
@vote.route("/create", methods=["GET", "POST"])
def create_vote():
    if request.method == "GET":
        return render_template("create_vote.html")
    
    from . import db
    
    if not current_user.is_admin:
        return jsonify({"error": "No access!"}), 403
    
    vote_data = request.json
    name = vote_data['name']
    description = vote_data['description']
    deadline = date.fromisoformat(vote_data['deadline'])
    tags = " ".join(vote_data['tags'])
    
    new_vote = Vote(
        name = name,
        description = description,
        deadline = deadline,
        tags = tags,
        completed = False,
    )
    
    db.session.add(new_vote)
    db.session.commit()
    
    print(f"{name}\n{description}\n{deadline}\n{tags}")
    
    return jsonify(vote_class_to_dict(new_vote))
