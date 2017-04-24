import uuidV4 from 'uuid/v4';
import { Aggregate, Schema } from 'js-cqrs-es';

import * as events from './events';
import * as handlers from './handlers';

const schema = new Schema({
    id: {
        type: String,
        required: true
    },
    version: {
        type: Number,
        required: true
    },
    content: String,
    enabled: {
        type: Boolean,
        default: false
    },
    articleId: new Schema({
        id: {
            type: String,
            required: true
        }
    })
});

class Content extends Aggregate {

    constructor(data) {
        super(data, schema);
    }

    applyEvent(command) {
        if ((/^(Enable|Disable)/).test(command.name)) {
            command.enabled = command.name === 'EnableContent';
        }
        else if ((/^Create/).test(command.name)) {
            command.articleId.id = uuidV4();
        }

        super.applyEvent(command);
    }

}

// export default Content class and namespaces for events and handlers
export { Content as default, events, handlers };
