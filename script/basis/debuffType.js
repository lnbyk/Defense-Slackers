
const debuffType = {
    NORMAL : ['normal', 0],
    DIZZY : ['dizzy', 90],
    FROZE : ['froze', 90, 6]
}

/*
 if we have DIZZY : ['dizzy', 2]
 which means next two updates won't update this enemy

 if we have FROZE : ['froze', 90, 2]
 which means next 90 updates enemy will slow down
 the update of the enemy will be 'update, not update, update, not update ...'
 if ['froze', 90, 6]
 then 'update, update ,update, not, not, not, update, update. update ...'
*/