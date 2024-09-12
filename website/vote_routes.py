from datetime import datetime
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
    
    # if not current_user.is_admin:
    #     return jsonify({"error": "No access!"}), 403
    
    # TODO: Get form data
    
    name = "Smith Machine"
    description = "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Mollitia fuga minima odio error sit quo sapiente veritatis, tempore laudantium nihil, quisquam aut reiciendis aperiam repudiandae corrupti non quas delectus sequi facere voluptate porro. At minus quaerat soluta quod delectus dolores nihil hic beatae eligendi asperiores. Iure neque repellat rerum ex beatae sed eligendi laborum officiis iste voluptas odio, cum id nulla pariatur nam expedita? Dolorem fuga consectetur quidem eveniet architecto aspernatur nemo ut voluptatem ea itaque asperiores odit minus tempora, praesentium reprehenderit ipsum provident aut illum sunt est at? Ullam esse, reprehenderit animi, at eum soluta voluptas amet deleniti nostrum alias obcaecati necessitatibus magnam rem dolores sint praesentium labore, fugit ut perferendis ab repudiandae quibusdam. Quibusdam deserunt voluptates et nam dolorum omnis ipsam id minus sed praesentium ipsum eveniet nihil neque dolorem nostrum, veniam reprehenderit ut eligendi assumenda aperiam sit tenetur! Iure odit provident officia consequatur, voluptate rem veniam perspiciatis!"
    deadline = datetime.now().date()
    tags = "Gym Budget"
    
    new_vote = Vote(
        name = name,
        description = description,
        deadline = deadline,
        tags = tags,
        completed = False,
    )
    
    db.session.add(new_vote)
    db.session.commit()
    
    print("Vote created successfully.")
    
    return redirect(url_for("home.homepage"))
