-- User (사용자) 테이블
CREATE TABLE User (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255),
    role VARCHAR(50)
);

-- Trainer (트레이너) 테이블
CREATE TABLE Trainer (
    trainer_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    description TEXT,
    uploaded_videos INT
);

-- Video (영상) 테이블
CREATE TABLE Video (
    video_id INT AUTO_INCREMENT PRIMARY KEY,
    trainer_id INT,
    video_title VARCHAR(255),
    video_url VARCHAR(255),
    price DECIMAL(10, 2),
    view_cnt INT
);

-- Member (회원) 테이블
CREATE TABLE Member (
    member_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    profile_info TEXT
);

-- Board (게시판) 테이블
CREATE TABLE Board (
    board_id INT AUTO_INCREMENT PRIMARY KEY,
    author_id INT,
    post_content TEXT,
    post_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Comments (댓글) 테이블
CREATE TABLE Comments (
    comment_id INT AUTO_INCREMENT PRIMARY KEY,
    board_id INT,
    author_id INT,
    comment_content TEXT,
    comment_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Review (리뷰) 테이블
CREATE TABLE Review (
    review_id INT AUTO_INCREMENT PRIMARY KEY,
    video_id INT,
    member_id INT,
    title VARCHAR(255),
    content TEXT,
    rating INT
);

-- 외래 키 설정
ALTER TABLE Trainer ADD FOREIGN KEY (user_id) REFERENCES User(user_id);
ALTER TABLE Video ADD FOREIGN KEY (trainer_id) REFERENCES Trainer(trainer_id);
ALTER TABLE Member ADD FOREIGN KEY (user_id) REFERENCES User(user_id);
ALTER TABLE Board ADD FOREIGN KEY (author_id) REFERENCES User(user_id);
ALTER TABLE Comments ADD FOREIGN KEY (board_id) REFERENCES Board(board_id);
ALTER TABLE Comments ADD FOREIGN KEY (author_id) REFERENCES User(user_id);
ALTER TABLE Review ADD FOREIGN KEY (video_id) REFERENCES Video(video_id);
ALTER TABLE Review ADD FOREIGN KEY (member_id) REFERENCES Member(member_id);
