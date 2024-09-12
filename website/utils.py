from .models import Vote

def vote_class_to_dict(vote: Vote):
    return {
        'name': vote.name,
        'description': vote.description,
        'deadline': vote.deadline,
        'tags': vote.tags.split(" "),
        'completed': vote.completed,
    }