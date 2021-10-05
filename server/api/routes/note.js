import * as $ from '../../controllers/note_controller.js';
import verify from '../../middleware/verify.js';
import {init} from '../../controllers/note_controller.js';

export default async(router) => {
    $.init();
    router.post('/note', /*verify,*/ $.createNote)
        .get('/note', $.getNote);
};
