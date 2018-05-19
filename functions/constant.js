let resultCode = {
    OK: 1,
    DATABASE_EXCEPTION: 0,
    EXCEPTION: -1,
    EMPTY_OR_NULL: 000,
    NOT_NUMBER: 001,
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

}

/**
 * Team
 */
let team = {
    addMember:{
        success:{
            ADD_TOURIST_LOCATION: "Add new tourist location success",
            ADD_TOURIST_LOCATION_DETAIL: "Add tourist detail success",
        },
        fail:{
            ADD_TOURIST_LOCATION: "Add new tourist location fail",
            ADD_TOURIST_LOCATION_DETAIL: "Add tourist detail fail",
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
 * Comment
 */
let comment = {

}

module.exports = { 
    resultCode : resultCode,
    touristLocation : touristLocation,
    team: team,
}
