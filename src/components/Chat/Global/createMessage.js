import React, { Component } from 'react'
import { firebaseStorage, firebaseAuth, firestore} from '../../firebase/firebase'
import FileUploader from 'react-firebase-file-uploader'
import TextareaAutosize from 'react-textarea-autosize';
export class createMessage extends Component {
	constructor() {
		super();
		this.state = {
			userAuth: firebaseAuth().currentUser.uid,
			createPostModal: false,
			showModal: false,
			data: '',
			dataText: '',
			messageContent: '',
			UserUid: '',
			UserName: '',
			userAvatar: '',
			messageImage: '',
			ProgressUpolad: 0,
		}
	}
	formIsEmpty = ({ messageContent }) => {
		return !messageContent.length;
	}

	isFormValid = () => {
		if (this.formIsEmpty(this.state)) {
			return false
		} else {
			return true
		}
	}

	handleSubmit = event => {
		event.preventDefault()
		if (this.isFormValid()) {
			const { messageContent, data, UserName, UserUid, userAvatar, dataText, messageImage } = this.state;
			firestore().collection('globalMessage').doc(data).set({
				content: messageContent,
				data: data,
				userAvatar,
				UserName,
				UserUid,
				dataText,
				messageImage,
			})
			this.setState({ createPostModal: false, messageContent: '' })
		}
	}

	componentDidMount() {
		this.DataInterval = setInterval(() => this.setState({ data: Date.now().toString() }), 1000)
		this.dataTextInterval = setInterval(() => this.setState({ dataText: new Date().toLocaleString("en-us") }), 1000)
		const { userAuth } = this.state;
		firestore().collection('users').doc(userAuth).get().then((doc) => {
			if (doc.exists) {
				this.setState({
					userAvatar: doc.data().avatar,
					UserName: doc.data().userName,
					UserUid: doc.data().userUid,
				})
			}
		})
	}

	handleProgress = progress => { this.setState({ ProgressUpolad: progress }) }
	handleUploadSuccess = filename => {
		firebaseStorage().ref('globalMessagesImages').child(filename).getDownloadURL()
			.then(url => this.setState({
				messageImage: url,
				ProgressUpolad: 100,
				userAvatarEvent: 'Upload success!',
			}))
	}

	handleChange = event => {
		this.setState({ [event.target.name]: event.target.value })
	};
	render() {
		const { messageContent } = this.state;
		return (
			<div>
				<div>
					<form onSubmit={this.handleSubmit}>
						<TextareaAutosize
							onChange={this.handleChange}
							placeholder="Write something.."
							name="messageContent"
							type="text"
							value={messageContent} />
						<img src={this.state.postImage} alt="" />
						<div>
							<FileUploader
								accept='image/*'
								name='image'
								storageRef={firebaseStorage().ref('globalMessagesImages')}
		  					onUploadSuccess={this.handleUploadSuccess}
								onProgress={this.handleProgress}
							/>
							<button type="submit">Create Post</button>
						</div>
					</form>
				</div>
			</div>
		)
	}
}

export default createMessage
