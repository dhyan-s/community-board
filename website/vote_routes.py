from datetime import datetime, date
from flask import Blueprint, jsonify, redirect, request, url_for, render_template
from flask_login import current_user, login_required
from website.models import Vote
from website.utils import vote_class_to_dict
from .models import User, Vote

vote = Blueprint("vote", __name__)

@vote.route("/create", methods=["GET", "POST"])
@login_required
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

@vote.route("/upvote", methods=["POST"])
@login_required  # Ensure the user is logged in
def upvote():
    from . import db
    
    data = request.json
    
    vote_id = data['vote_id']
    user = User.query.get(current_user.id)

    vote_to_upvote = Vote.query.get(vote_id)
    
    if vote_to_upvote is None:
        return jsonify({'error': 'Vote not found'}), 404
    
    if vote_to_upvote in user.voted_votes:
        return jsonify({'message': 'You have already upvoted this vote'}), 400
    
    # Add the vote to the user's voted_votes list
    user.voted_votes.append(vote_to_upvote)
    
    # Commit the changes to the database
    db.session.commit()
    
    return jsonify({'message': 'Upvoted successfully'}), 200


@vote.route("/get_all/")
def get_all():
    votes = [vote_class_to_dict(vote_cls) for vote_cls in Vote.query.all()]
    return jsonify(votes)