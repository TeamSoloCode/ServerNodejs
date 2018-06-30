let resultCode = {
    OK: 1,
    SUCCESSFUL: 2,
    DATABASE_EXCEPTION: 0,
    EXCEPTION: -1,
    EMPTY_OR_NULL: 000,
    NOT_NUMBER: 001,
    team:{
        ALREADY_HAS_TEAM: 111,
        NOT_LEADER: 112,
        HAS_NO_TEAM: 113,
        NOT_MEMBER: 114,
        EMAIL_DOES_NOT_EXIST: 115,
        CAN_NOT_INVITE_YOURSEFT: 116,
        IS_LEADER: 117
    },
    rating:{
        WRONG_RATE_VALUE: 111
    }
}
let common = {
    TRY_AGAIN: 'Something wrong happened. Please try again later'
}
/**
 * Tourist Location
 */
let touristLocation = {
    add:{
        success:{
            ADD_TOURIST_LOCATION: "Add new tourist location success",
            ADD_TOURIST_LOCATION_DETAIL: "Add tourist detail success",
        },
        fail:{
            ADD_TOURIST_LOCATION: "Add new tourist location fail",
            ADD_TOURIST_LOCATION_DETAIL: "Add tourist detail fail",
        }
    },
    edit:{
        success:{
            EDIT_TOURIST_LOCATION: "Tourist location updated",
            EDIT_TOURIST_LOCATION_DETAIL:"Update tourist location success",
        },
        fail:{
            EDIT_TOURIST_LOCATION: "Edit tourist location fail",
            EDIT_TOURIST_LOCATION_DETAIL:"Edit tourist location's detail fail",
        }
    },
    delete:{
        success:{
            DELETE_TOURIST_LOCATION:"Delete tourist location success",
            DELETE_TOURIST_LOCATION_DETAIL:"Delete tourist location detail success"
        },
        fail:{
            DELETE_TOURIST_LOCATION:"Delete tourist location fail",
            DELETE_TOURIST_LOCATION_DETAIL:"Delete tourist location detail fail"
        }
    }
}

/**
 * Rating
 */
let rating ={
    wrongRateValue:{
        WRONG_RATE_VALUE: "Wrong rate value"
    },
    success:{
        RATING: "Rating success! Thank you for your time.",
        DELETE_RATING: "Delete rating success"
    },
    fail:{
        
    }
}

/**
 * Team
 */
let team = {
    canNotInviteYourseft:{
        CAN_NOT_INVITE_YOURSEFT: "You can not invite yourseft !"
    },
    checkEmail:{
        EMAIL_DOES_NOT_EXIST: "Users email does not exist"
    },
    notMember:{
        NOT_MEMBER: "You're not the member of the team"
    },
    joinTeam:{
        success:{
            JOIN_TEAM:"Join team success",
        },
        fail:{
            JOIN_TEAM:"Join team fail"
        }
    },
    notLeader:{
        NOT_LEADER: "You're not the leader of this team"
    },
    hasTeam:{
        ALREADY_HAS_TEAM: "You already has team"
    },
    inviteMember:{
        success:{
            INVITATION:"Your invitation has been sent",
        },
        fail:{
            INVITATION:"Can't send your invitation"
        }
    },
    editTeamProfile:{
        success:{
            EDIT_TOURIST_LOCATION: "Tourist location updated",
            EDIT_TOURIST_LOCATION_DETAIL:"Update tourist location success",
        },
        fail:{
            EDIT_TOURIST_LOCATION: "Edit tourist location fail",
            EDIT_TOURIST_LOCATION_DETAIL:"Edit tourist location's detail fail",
        }
    },
    removeMember:{
        success:{
            DELETE_TOURIST_LOCATION:"Delete tourist location success",
            DELETE_TOURIST_LOCATION_DETAIL:"Delete tourist location detail success"
        },
        fail:{
            DELETE_TOURIST_LOCATION:"Delete tourist location fail",
            DELETE_TOURIST_LOCATION_DETAIL:"Delete tourist location detail fail"
        }
    },
    createTeam:{
        success:{
            CREATE_TEAM: "Create team success"
        },
        fail:{
            CREATE_TEAM: "Create team fail"
        }
    },
    deleteTeam:{
        success:{
            DELETE_TOURIST_LOCATION:"Delete tourist location success",
            DELETE_TOURIST_LOCATION_DETAIL:"Delete tourist location detail success"
        },
        fail:{
            DELETE_TOURIST_LOCATION:"Delete tourist location fail",
            DELETE_TOURIST_LOCATION_DETAIL:"Delete tourist location detail fail"
        }
    },
    leaveTeam:{
        success:{
            LEAVE_TEAM: "You just have left your the team !!"
        },
        fail:{
            LEAVE_TEAM: "You can't leave this team now !!"
        }
    }
}

/**
 * Comment
 */
let comment = {
    success:{
        addComment:{
            ADD_COMMENT: "Comment successful"
        }
    },
    fail:{
        addComment:{
            ADD_COMMENT: "Comment fail"
        }
    }
}

module.exports = { 
    resultCode : resultCode,
    touristLocation : touristLocation,
    team: team,
    common: common,
    rating: rating,
    comment: comment
}
